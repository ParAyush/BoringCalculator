class Calc{
    constructor(PrevOppTextElement, CurrOppTextElement){
        this.PrevOppTextElement = PrevOppTextElement
        this.CurrOppTextElement = CurrOppTextElement
        this.clear()
    }

    clear(){
        this.CurrOpp = ''
        this.PrevOpp = ''
        this.operation = undefined
    }

    delete(){
        this.CurrOpp = this.CurrOpp.toString().slice(0,-1)

    }
    
    appendnum(number){
        if(number === '.' && this.CurrOpp.includes('.')) return
        this.CurrOpp= this.CurrOpp.toString() + number.toString()
    }

    chooseopp(operation){
        if(this.CurrOpp === '') return
        if (this.PrevOpp !== ''){
            this.compute()
        }
        this.operation = operation
        this.PrevOpp = this.CurrOpp
        this.CurrOpp = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.PrevOpp)
        const current = parseFloat(this.CurrOpp)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this,this.CurrOpp = computation
        this.operation = undefined
        this.PrevOpp = ''
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const interDigits = parseFloat(stringNumber.split('.')[0])
        const decDigits = stringNumber.split('.')[1]
        let IntegerDisplay
        if(isNaN(interDigits)){
            IntegerDisplay = ''
        } else {
            IntegerDisplay=interDigits.toLocaleString('en',{
                maximumFractionDigits: 0})
        }
        if(decDigits != null){
            return `${IntegerDisplay}.${decDigits}`
        } else{
            return IntegerDisplay
        }
    }

    updatedisplay(){
        this.CurrOppTextElement.innerText = 
        this.getDisplayNumber(this.CurrOpp)
        if(this.operation != null){
            this.PrevOppTextElement.innerText =
            `${this.getDisplayNumber(this.PrevOpp)} ${this.operation}`

        }else{
            this.PrevOppTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const oppButtons = document.querySelectorAll('[data-operation]')
const EqButton = document.querySelector('[data-equals]')
const DelButton = document.querySelector('[data-delete]')
const ClearButton = document.querySelector('[data-clear]')
const PrevOppTextElement = document.querySelector('[data-prev]')
const CurrOppTextElement = document.querySelector('[data-curr]')

const calc =  new Calc (PrevOppTextElement, CurrOppTextElement)

numberButtons.forEach(button =>{
    button.addEventListener('click', () => {
        calc.appendnum(button.innerText)
        calc.updatedisplay()
    })
})

oppButtons.forEach(button =>{
    button.addEventListener('click', () => {
        calc.chooseopp(button.innerText)
        calc.updatedisplay()
    })
})

EqButton.addEventListener('click', button =>{
    calc.compute()
    calc.updatedisplay()
})

DelButton.addEventListener('click', button =>{
    calc.delete()
    calc.updatedisplay()
})

ClearButton.addEventListener('click', button =>{
    calc.clear()
    calc.updatedisplay()
})