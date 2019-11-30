<template>
  <div
    id="app"
    class="fundo">
    <v-app id="pacific">
      <v-container
        fill-height
        fluid
        grid-list-xl
      >
        <v-layout wrap>
          <v-flex
            xl12
            lg12
            md12
            sm12
            xs12
          >
            <material-card
              color="grey darken-2"
              title="Cadastrar vendedor"
            >
              <v-form
                ref="formCadastro"
                v-model="valid"
                lazy-validation
              >
                <v-text-field
                  v-model="vendedor.nomeVendedor"
                  :rules="nomeRules"
                  label="Nome"
                  required
                />
                <v-text-field
                  v-model="vendedor.codigoVendedor"
                  :rules="codigoRules"
                  label="Código"
                  required
                />
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  height="150"
                >
                <v-text-field
                  v-model="imageName"
                  prepend-icon="mdi-paperclip"
                  label="Selecionar a imagem"
                  @click="pickFile"
                />
                <input
                  ref="image"
                  type="file"
                  style="display: none"
                  accept="image/*"
                  @change="onFilePicked"
                >
                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="handleSubmit"
                >
                  Cadastrar
                </v-btn>
                <v-btn
                  color="error"
                  class="mr-4"
                  to="/vendedores"
                >
                  Cancelar
                </v-btn>
              </v-form>
            </material-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      valid: true,
      imageName: '',
      imageUrl: '',
      imageFile: '',
      vendedor: {
        nomeVendedor: '',
        codigoVendedor: '',
        filaVendedor: 'Espera',
        imagemVendedor: ''
      },
      nomeRules: [
        v => !!v || 'O campo Nome é obrigatório'
      ],
      codigoRules: [
        v => !!v || 'O campo Login é obrigatório'
      ]
    }
  },
  computed: {},
  created () {},
  methods: {
    ...mapActions('vendedores', {
      register: 'register'
    }),
    handleSubmit () {
      if (this.$refs.formCadastro.validate()) {
        this.register(this.vendedor)
        this.$refs.formCadastro.reset()
      }
    },
    pickFile () {
      this.$refs.image.click()
    },
    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.vendedor.imagemVendedor = this.imageUrl
          this.imageFile = files[0]
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    }
  }
}
</script>
