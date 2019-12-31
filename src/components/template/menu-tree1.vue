<template>
  <div class="ddp-tree">
    <div v-show="showRootMark" class="ddp-tree-root">{{ rootMark || rootInfo.busintypename}}</div>
    <div class="ddp-tree-nodes">
      <el-tree
        ref="tree"
        node-key="id"
        :default-expand-all="expandAll"
        :data="treeData"
        :props="defaultProps"
        :expand-on-click-node="false"
        :check-strictly="checkStrictly"
        :default-expanded-keys="defaultExpandedKeys"
        :default-checked-keys="defaultCheckedKeys"
        @node-click="handleNodeClick"
        :show-checkbox="showCheckbox"
        @check="handleCheckAll"
        @check-change="checkChange"
        :draggable="draggable"
        :allow-drop="allowDrop"
        @node-drag-end="handleDragEnd"
        highlight-current
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>
            <i v-show="showIcon" :class="node.icon"></i>
            {{ node.label }}
          </span>
          <span>
            <el-button
              v-show="showAddBtn"
              icon="el-icon-plus"
              circle
              size="mini"
              @click="() => appendBtn(node, data)"
              :class="addClass"
            ></el-button>
            <el-button
              v-show="showEditBtn"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="() => updateBtn(node, data)"
              :class="editClass"
            ></el-button>
            <el-button
              v-show="showDelBtn"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="() => removeBtn(node, data)"
              :class="delClass"
            ></el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: "menu-tree",
  props:{
        addClass:{
            type:String
        },
        editClass:{
            type:String
        },
        delClass:{
            type:String
        },
        app:{
            type:String,
            default: 'ddp-permission'/*'ddp-permission'*/ /*ProjectSetting.defaultApp*/
        },
        expandAll:{
            type:Boolean,
            default:true
        },
        checkStrictly:{
            type:Boolean,
	        default:false
	    },
        rootMark:{
            type:String,
            default: ""
        },
        showRootMark:{
            type:Boolean,
            default:false
        },
        service:{
            type:String,
            default:'dynamicTreeService'
        },
        method:{
            type:String,
            default:'query'
        },
        busintypeid:{
            type:String,
            default:'NONE'
        },
        resultKey:{
            type:String,
            default:'list'
        },
        draggable:{
            type:Boolean,
            default:false
        },
        multi:{
        	type:Boolean,
        	default:false
        },
        showIcon:{
            type:Boolean,
            default:false
        },
        showCheckbox:{
            type:Boolean,
            default:false
        },
        pid:{
            type:String,
            default:'-1'
        },
        para:{
            type:[String,Object],
            default: {}
        }
    },
    data(){
        return {
            showAddBtn:false, /*add*/
            showEditBtn:false, /*edit*/
            showDelBtn:false, /*del*/
            treeData:[],
            defaultProps:{
                icon:null, /*图标*/
                children: 'children',
                label: 'label',
                id:'',
                realObj:null,
                inited:false,
                extData:null
            },
            getInitedArr:[], /*获取inited*/
            rootInfo:{}, /*初始化root*/
            defaultExpandedKeys:[], /*默认展开*/
            defaultCheckedKeys:[] /*默认勾选*/
        }
    },
    watch:{

    },
    mounted(){
        this.treeInit()
    },
    methods:{
    	checkChange(item,node,self){
    		if(this.checkStrictly){
    			if(this.multi==true){
    				var dd = this.$refs.tree.getCheckedKeys();
    				if(node==true){
    					dd.push(item.id)
    				}
    				this.$refs.tree.setCheckedKeys(dd)
    			}else{
    				if(node==true){
    					this.$refs.tree.setCheckedKeys([item.id])
    				}
    			}
    		}
    		this.$emit('checkChange',item,node,self)
    	},
        treeInit(){
    		this.treeData=[]
            if(this.busintypeid==="NONE" && this.service==="dynamicTreeService" && this.method==="query"){
                console.error('busintypeid 或者 service&method 至少一个不能为空','ddp-tree');
                return false;
            }
            this.rootDataInit();
            if(this.$listeners.add){
                this.showAddBtn = true
            }
            if(this.$listeners.edit){
                this.showEditBtn = true
            }
            if(this.$listeners.del){
                this.showDelBtn = true
            }
        },
        refresh(){
            this.getInitedArr = this.getInitedData();
            this.$set(this,'treeData',[]);
            this.coverTreeNodeData(this.getInitedArr)
        },
        getInitedData(){
            var arr = [];
            (function getInitedData(data){
                $(data).each(function(i,e){
                    if(e.inited===true){
                        arr.push(e);
                    }
                    if(e.children.length>0){
                        getInitedData(e.children);
                    }
                });
            })(this.treeData);
            return arr;
        },
        coverTreeNodeData(initedData){
            const $this = this;
            comm.ajax({
                url:comm.getAjaxUrl(this.service,"queryTree",this.app),
                data:Object.assign(this.para,{busintypeid:this.busintypeid,listName:this.resultKey})
            }).then((res)=>{
                $(res.result[this.resultKey]).each(function(i,e){
                    let node = new Object();
                    let extData = eval("("+e.extData+")");
                    node.children = [];
                    node.icon = e.icon ||'el-icon-warning'; /*加载图标*/
                    node.label = e.nodeName;
                    node.id = extData.viewItemId;
                    node.realObj = e;
                    node.inited = false;
                    node.extData = extData;
                    $this.treeData.push(node);
                });
                function treeDataWhile (refreshData){
                    if(initedData.length<1){
                        return false;
                    }
                    $(refreshData||$this.treeData).each(function(i,e){
                        if(!e.inited){
                            $(initedData).each(function(i1,e1){
                                if(e.id===e1.id && e1.inited){
                                    comm.ajax({
                                        url:comm.getAjaxUrl($this.service,"queryTree",$this.app),
                                        data:e.extData
                                    }).then((resn)=>{
                                        $(resn.result[$this.resultKey]).each(function(i2,e2){
                                            let node = new Object();
                                            let extData = eval("("+e2.extData+")");
                                            node.children = [];
                                            node.icon = e2.icon ||'el-icon-warning'; /*加载图标*/
                                            node.label = e2.nodeName;
                                            node.id = extData.viewItemId ;
                                            node.realObj = e2;
                                            node.inited = false;
                                            node.extData = extData;
                                            e.children.push(node);
                                        });
                                        e.inited=true;
                                        e1.inited=false;
                                        treeDataWhile();
                                    });
                                }
                            });
                        }
                        if(e.children.length>0){
                            treeDataWhile(e.children);
                        }
                    });
                }
                treeDataWhile();
            });
        },
        rootDataInit(){
            if(typeof this.para === "string"){
                this.para = eval("("+this.para+")")
            }
            if(this.showRootMark){
                comm.ajax({
                    url:comm.getAjaxUrl(this.service,this.method,this.app),
                    data:Object.assign(this.para,{busintypeid:this.busintypeid})
                }).then((res)=>{
                    this.rootInfo = res.result.tree;
                });
            }
            this.nodeDataInit();
        },
        nodeDataInit(){
            comm.ajax({
                url:comm.getAjaxUrl(this.service,"queryTree",this.app),
                data:Object.assign(this.para,{busintypeid:this.busintypeid,listName:this.resultKey})
            }).then((res)=>{
                var $this = this;
                $(res.result[this.resultKey]).each(function(i,e){
                    let node = new Object();
                    let extData = eval("("+e.extData+")");
                    node.children = [];
                    node.icon = e.icon ||'el-icon-warning'; /*加载图标*/
                    node.label = e.nodeName;
                    node.id = extData.viewItemId;
                    node.realObj = e;
                    node.inited = false;
                    node.extData = extData;
                    $this.treeData.push(node);
                });
                //this.defaultCheckedKeys = this.$refs.tree.getCheckedNodes().concat(this.$refs.tree.getHalfCheckedNodes()); /*获取默认所有选中*/
            });
        },
        setData(data){
        	this.treeData=data
        },
        /*点击菜单*/
        handleNodeClick(onnode){
            if(!onnode.inited){
                comm.ajax({
                    url:comm.getAjaxUrl(this.service,"queryTree",this.app),
                    data:onnode.extData
                }).then((res)=>{
                    var $this = this;
                    $(res.result[$this.resultKey]).each(function(i,e){
                        let node = new Object();
                        let extData = eval("("+e.extData+")");
                        node.children = [];
                        node.icon = e.icon ||'el-icon-warning'; /*加载图标*/
                        node.label = e.nodeName;
                        node.id = extData.viewItemId ;
                        node.realObj = e;
                        node.inited = false;
                        node.extData = extData;
                        onnode.children.push(node);
                    });
                });
                onnode.inited=true;
            }
            this.$emit('nodeClick',onnode)
        },


        /*当前勾选*/
        handleCheckAll(data,obj){
            var arr = obj.halfCheckedNodes.concat(obj.checkedNodes);
            this.$emit('checkAll',arr,data,obj)
        },
        getChecked(left,includeHalfChecked){
        	return this.$refs.tree.getCheckedNodes(left||false,includeHalfChecked||true);
        },
        setChecked(nodes){
        	$(nodes).each(function(i,e){
        		e.key=e.id
        	});
        	return this.$refs.tree.setCheckedNodes(nodes);
        },

        /*按钮*/
        appendBtn(node,data) {
            this.$emit('add',node,data);
        },
        updateBtn(node,data) {
            this.$emit('edit',node,data)
        },
        removeBtn(node,data) {
            this.$emit('del',node,data)
        },

        /*拖拽*/
        allowDrop(draggingNode, dropNode, type) {
            if (dropNode.data.label === draggingNode.data.label) {
                return type !== 'inner';
            } else {
                return true;
            }
        },
        handleDragEnd(draggingNode, dropNode, dropType, ev) {
            var ids = comm.getTreeLevelInfo(this.treeData,this.pid).join(',');
            this.$emit('dragTreeEnd',ids)
        }
    }
};
</script>

<style scoped>
</style>
