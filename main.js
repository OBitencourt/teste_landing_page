

const Main = {

    init: function() {
        this.cacheSelectors()
        this.bindEvents()
        
    },

    cacheSelectors: function() {
        this.$formSign = document.querySelector('.formSign')
        this.$inputName = document.querySelector('.inputNome')
        this.$inputEmail = document.querySelector('.inputEmail')
        this.$inputCPF = document.querySelector('.inputCPF')
    },

    bindEvents: function( ){
        const self = this

        
        this.$formSign.addEventListener('submit', self.Events.formSign_error.bind(self)) // utilizar bind(self) pois o código não estava achando o submit da função
    },

    Events: {

        formSign_error: function(event) {
            event.preventDefault()
            const labelName = event.target[0].previousElementSibling
            const labelEmail = event.target[1].previousElementSibling
            const labelCPF = event.target[2].previousElementSibling

            let temErro = true

            const valueName = this.$inputName.value
            const valueEmail = this.$inputEmail.value
            const valueCPF = this.$inputCPF.value

            if (!valueName) {
                this.$inputName.classList.add('inputErro')
                this.$inputName.classList.remove('input')
                labelName.classList.add('erro')
            }

            if (!valueEmail) {
                this.$inputEmail.classList.add('inputErro')
                this.$inputEmail.classList.remove('input')
                labelEmail.classList.add('erro')
            }

            if (!valueCPF) {
                this.$inputCPF.classList.add('inputErro')
                this.$inputCPF.classList.remove('input')
                labelCPF.classList.add('erro')
            }

            const self = this

            this.$inputName.addEventListener('keypress', function(e) {
                self.$inputName.classList.remove('inputErro')
                self.$inputName.classList.add('input')
                labelName.classList.remove('erro')
            })

            this.$inputEmail.addEventListener('keypress', function(e) {
                self.$inputEmail.classList.remove('inputErro')
                self.$inputEmail.classList.add('input')
                labelEmail.classList.remove('erro')
            })

            this.$inputCPF.addEventListener('keypress', function(e) {
                self.$inputCPF.classList.remove('inputErro')
                self.$inputCPF.classList.add('input')
                labelCPF.classList.remove('erro')
            })


            if (temErro === false) {
                this.$formSign.submit()
            }
            
        },

        
        
    }
}

Main.init()