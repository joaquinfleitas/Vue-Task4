const { createApp } = Vue

createApp({
    data(){
        return {
            cards: null,
            objetos : [],
            valueBusqueda:"",
            checked: [],
            categorias:[],
            objetosFiltrados: [],
        }
    }, 
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(response => response.json())
        .then(data => {
            this.objetos = data.events
            this.objetosFiltrados = [... this.objetos]
            this.categorias = [ ...new Set(this.objetos.map(objeto => objeto.category)) ]
        })
        .catch()
    },
    methods: {
        filtroCruzado: function(){
                let filtroPorBusqueda = this.objetos.filter( objeto => objeto.name.toLowerCase().includes( this.valueBusqueda.toLowerCase()))
                if( this.checked.length === 0 ){
                    this.objetosFiltrados = filtroPorBusqueda
                }else{
                    let filtradosPorCheck = filtroPorBusqueda.filter( objeto => this.checked.includes( objeto.category ))
                    this.objetosFiltrados = filtradosPorCheck 
            } 
        }
    },






}).mount('#app')