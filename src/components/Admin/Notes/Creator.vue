<template>
    <form @keydown="errors.clear($event.target.name)"
          @submit.prevent=""
    >
        <div class="row" v-if="targeted.model">
            <h3>Existing Notes</h3>
            <div class="col-sm-12" v-if="!! targeted.model.comment"></div>
            <div class="col-sm-12" v-for="note in targeted.model.notes">
                {{ note.content }}
                <button class="btn btn-sm btn-danger"
                        @click="deleteNote(note.id)"
                >
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="form-group"
                     :class="{ 'has-error': errors.has('content') }"
                >
                    <label for="content">content</label>
                    <textarea class="form-control"
                              id="content"
                              name="content"
                              v-model="form.content"
                    ></textarea>
                    <error input="content" :errors="errors"></error>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <label>&nbsp;</label>
                <button class="btn btn-success btn-block"
                        :disabled="errors.any()"
                        @click="save()"
                >
                    Save
                </button>
            </div>
            <div class="col-sm-6">
                <label>&nbsp;</label>
                <button class="btn btn-outline-danger btn-block"
                        @click="$emit('cancelled')"
                >
                    Cancel
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import FormErrors from '../../../models/FormErrors';
import swal from "sweetalert2";

import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import * as noteActions from "../../../vuex/modules/notes/actionTypes";

export default {
  props: [],
  data() {
    let form = {
        content: ""
      };
    let formFields = Object.keys(form);
    return {
      errors: new FormErrors(formFields),
      form,
    };
  },
  methods: {
    save() {
      if (!this.form.content) {
        alert("You must specify a reason.");
        return;
      }

      let vm = this;
      let modelName = this.targeted.type;
      let modelId = this.targeted.model.id;
      this.$store
        .dispatch("notes/" + noteActions.SAVE, {
          ...this.form,
          modelName,
          modelId
        })
        .then(response => {
          swal("success", "Saved", "success");
          vm.$emit("saved");
        })
        .catch(failedRequest => {
          vm.errors.fill(failedRequest);
        });
    },
    deleteNote(id) {
      this.$store
        .dispatch("notes/" + noteActions.DELETE, id)
        .then(response => {
          swal('Success', 'That note was deleted.', 'success');
        })
        .catch(error => {
          swal('Error', 'Something went wrong...', 'error');
        });
    },
  },
  computed: {
    ...mapState("notes", ["targeted"])
  },
};
</script>

<style>

</style>