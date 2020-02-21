<template>
    <div>
      <dialog id="confirm-modal" class="modal">
        <div class="modal-content">
          <svg t="1574164208713" class="model-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5819" width="63" height="63"><path d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0zM512 877.714286c-40.228571 0-73.142857-32.914286-73.142857-73.142857s32.914286-73.142857 73.142857-73.142857 73.142857 32.914286 73.142857 73.142857S552.228571 877.714286 512 877.714286zM585.142857 512c0 40.228571-32.914286 73.142857-73.142857 73.142857s-73.142857-32.914286-73.142857-73.142857L438.857143 219.428571c0-40.228571 32.914286-73.142857 73.142857-73.142857s73.142857 32.914286 73.142857 73.142857L585.142857 512z" p-id="5820" fill="white"></path></svg>
          <h2 class="modal-title">Are you sure?</h2>
          <p class="modal-description">
            You can't undo this action.
          </p>
          <div class="modal-options">
            <button
              class="btn btn-round btn-fill btn-fill-left option confirm"
              data-text="Yes"
              onclick="document.querySelector('#confirm-modal').close()"
            ></button>
            <button
              class="btn btn-round btn-fill btn-fill-right option cancel"
              data-text="No"
              onclick="document.querySelector('#confirm-modal').close()"
            ></button>
          </div>
        </div>
      </dialog>
      <form action="javascript:void(0);">
        <button
          class="btn btn-danger"
          onclick="document.querySelector('#confirm-modal').showModal()"
        >
          Delete history
        </button>
      </form>

    </div>
</template>

<script>
  export default {
    name: 'hdialog'
  }
</script>

<style scoped lang="scss">
  @import url(https://fonts.googleapis.com/css?family=Lato);

  :root {
    --primary-color: hsl(171, 100%, 41%);
    --success-color: hsl(141, 53%, 53%);
    --danger-color: hsl(348, 86%, 61%);
  }

  body {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    font-family: Lato, sans-serif;
    background: #ECEFFC;
  }

  .btn {
    position: relative;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: hsl(0, 0%, 13%);
    text-decoration: none;
    background-color: white;
    border: transparent;
    border-radius: 3px;
    outline: transparent;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    transition: 0.25s;

    &-danger {
      color: white;
      background-color: var(--danger-color);

      &:hover {
        background-color: hsl(348, 86%, 53%);
      }
    }

    &-round {
      border-radius: 30px;
    }

    &-fill {
      overflow: hidden;

      &-left {
        &::before {
          transform: translateX(100%);
        }
      }

      &-right {
        &::before {
          transform: translateX(-100%);
        }
      }

      &::before {
        position: absolute;
        content: "";
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        transition: 0.4s cubic-bezier(0.75, 0, 0.25, 1);
      }

      &::after {
        position: relative;
        content: attr(data-text);
        transition: 0.4s ease;
      }

      &:hover::before {
        transform: translateX(0);
      }

      &:hover::after {
        color: white !important;
      }
    }
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    color: white;
    background-image: linear-gradient(to right, #0acffe 0%, #495aff 100%);
    border: transparent;
    border-radius: 12px;
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
    animation: show-modal 0.5s ease forwards;

    &::backdrop {
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(3px);
    }

    .model-icon {
      margin-bottom: 1.25rem;
      opacity: 0;
      animation: show-modal-icon 0.5s ease 0.2s forwards;
    }

    .modal-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 300px;
      padding: 1em;

      .modal-title {
        margin-top: 0;
        margin-bottom: 1.2rem;
        opacity: 0;
        animation: show-modal-text 0.5s ease 0.35s forwards;
      }

      .modal-description {
        margin: 0;
        opacity: 0;
        animation: show-modal-text 1s ease 0.5s forwards;
      }

      .modal-options {
        margin-top: 1rem;
        display: flex;
        justify-content: space-around;

        .option {
          padding: 0 2em;
          margin: 0.3em;
          font-size: 20px;
          font-weight: 700;
          line-height: 2;
        }

        .confirm {
          opacity: 0;
          animation: show-modal-option 0.5s ease 0.65s forwards;

          &::before {
            background: var(--success-color);
          }

          &::after {
            color: var(--success-color);
          }
        }

        .cancel {
          opacity: 0;
          animation: show-modal-option 0.5s ease 0.8s forwards;

          &::before {
            background: var(--danger-color);
          }

          &::after {
            color: var(--danger-color);
          }
        }
      }
    }
  }

  @keyframes show-modal {
    from {
      transform: scale(0.8);
    }

    50% {
      transform: scale(1.1);
      opacity: 1;
    }

    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes show-modal-icon {
    from {
      transform: scale(0.4);
    }

    50% {
      transform: scale(1.2);
      opacity: 1;
    }

    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes show-modal-text {
    from {
      transform: scale(0.6);
    }

    50% {
      transform: scale(1.2);
      opacity: 1;
    }

    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes show-modal-option {
    from {
      transform: scale(0.4);
    }

    50% {
      transform: scale(1.2);
      opacity: 1;
    }

    to {
      transform: scale(1);
      opacity: 1;
    }
  }

</style>
