<template>
    <div class="modal fade in"
         tabindex="-1"
         role="dialog"
         aria-labelledby="myModalLabel"
         aria-hidden="true"
         style="padding-right: 15px;
         display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-hidden="true"
                            @click="$emit('close')">
                        ×
                    </button>
                    <h4 class="modal-title" id="myModalLabel">
                        <slot name="header">
                            MODAL HEADER
                        </slot>
                    </h4>
                </div>
                <div class="modal-body">

                    <slot name="body">
                        MODAL BODY
                    </slot>

                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>

</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: 'AdminCommonModal',
        data() {
            return {};
        },
        mounted() {
            let vm = this;
            document.addEventListener("keydown", (e) => {
                if (e.keyCode == 27) {
                    vm.$emit('close');
                }
            });
        }
    }
</script>

<style scoped>
.modal-body {
    margin-top: 0;
}
</style>