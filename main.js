
document.addEventListener('DOMContentLoaded', function() {

    const Main = {
    
        init: function() {
            
            this.cacheSelectors()
            this.bindEvents()
            this.Events.fetchAPI()
        },
    
        cacheSelectors: function() {
            this.$formSign = document.querySelector('.formSign')
            this.$inputName = document.querySelector('.inputNome')
            this.$inputEmail = document.querySelector('.inputEmail')
            this.$inputCPF = document.querySelector('.inputCPF')
            this.$productsBox = document.querySelector('.products')
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
    
            fetchAPI: function(event) {
    
                

                function transformJson (response) {
                    
                    return response.json()
                }
    
                function useData (data) {
                    const products = data.products
                    console.log(products)

                    const productsBox = document.querySelector('.products')
    
                    let html = ''
                    products.forEach(function(product) {
                        html += 
                        `
                        <div class="product">
                            <img src="${product.image}" alt="algo">
    
                            <div class="text">
    
                                <h4>${product.name}</h4>
                                <p>
                                    Descrição do produto um pouco maior, com duas linhas ou três que explica melhor do que se trata.
                                </p>
                                <span>
                                    De: R$${product.oldPrice}
                                </span>
        
                                <h3>
                                    Por: RS$${product.price}
                                </h3>
        
                                <span>
                                    ou ${product.installments.count}x de R$${product.installments.value}
                                </span>
        
                                <button class="button">
                                    Comprar
                                </button>
                            </div>
                        </div>
    
                        `
                    })
                    
                    productsBox.innerHTML = html
                }
                
    
                fetch('https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1').then(transformJson).then(useData)
            },
            
        }
    }
    
    Main.init()
})