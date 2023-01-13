const { createApp } = Vue

createApp({
    data(){
        return {
            objetos : null,
            upcomingFiltrado: undefined,
            pasteventFiltrado: undefined,
            maxMinPorcentaje: [],
        }
    }, 
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(response => response.json())
        .then(data => {
            this.objetos = data
            this.upcomingFiltrado = this.objetos.events.filter(event => event.date > this.objetos.currentDate)
            this.pasteventFiltrado = this.objetos.events.filter(event => event.date < this.objetos.currentDate)
            let listaDePorcentaje = this.newPropertyPercentage(this.data)
            this.maxPercentaje(listaDePorcentaje)
            this.minPercentaje(listaDePorcentaje)
            this.maxCapacity(this.objetos.events)
        })
        .catch(error => console.log(error))
    },
    methods:{
        revenues : function (prices, estimatesOrAssistance){ 
            let rev = prices * estimatesOrAssistance
            return rev.toLocaleString()
    },
        percentageOfAttendance : function (capacities, estimatesOrAssistance){
        let percentage = (estimatesOrAssistance / (capacities/100)).toFixed(0)
        return percentage
    },
        newPropertyPercentage : function (datos){
        let list = []

        let filteredAssistance = this.objetos.events.filter( event => event.assistance)
            for (let i = 0; i < filteredAssistance.length; i++) {
                    list.push(filteredAssistance[i]);
                    list[i].percentage = this.percentageOfAttendance(list[i].capacity, list[i].assistance);
            }
            return [...list.sort((event1, event2) => event2.percentage - event1.percentage)]
        },

        maxPercentaje : function (events2){
            let maxOrder = [...events2.sort((event1, event2) => event2.percentage - event1.percentage)]
            this.maxMinPorcentaje[0] = {name: maxOrder[0].name + " with " , percentage: maxOrder[0].percentage +"%"}
                },
        
        minPercentaje : function (events2){
            let minOrder = [...events2.sort((event1, event2) => event1.percentage - event2.percentage)]
            this.maxMinPorcentaje[1] = {name: minOrder[0].name + " with ", percentage: minOrder[0].percentage + "%"}
        },
        
        maxCapacity : function (events){
            let maximCapacity = events.sort((event1, event2) => event2.capacity - event1.capacity)
            this.maxMinPorcentaje[2] = {name: maximCapacity[0].name + " with ", capacity: (maximCapacity[0].capacity).toLocaleString() + " of capacity."} 
        }
    }
}).mount("#app")