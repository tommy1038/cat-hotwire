import { Controller } from "@hotwired/stimulus"
import { Modal } from "bootstrap"

// Connects to data-controller="modal"
export default class extends Controller {
  static targets = [
    "modal", "question", "select", "label",
  ]

  connect() {
    this.hiddenModal()
  }

  startModal(event) {
    event.preventDefault()

    this.currentModalIndex = Number(event.currentTarget.dataset.buttonNumber)
    this.showModal()
    this.createQuestion()
  }

  showModal() {
    this.modalTarget.style.display = "block"
  }

  hiddenModal() {
    this.modalTarget.style.display = "none"
  }

  createQuestion() {
    // 初期化
    this.questionTarget.innerHTML = ""

    const options = Array.from(this.selectTargets[this.currentModalIndex].options).map(option => ({
      text: option.text,
      value: option.value,
    }))

    const questionTarget = this.questionTarget

    const question = document.createElement("p")
    question.textContent = this.labelTargets[this.currentModalIndex].textContent

    questionTarget.appendChild(question)

    options.forEach((option) => {
      const button = document.createElement("button")

      // `select`メソッドを呼び出すための属性
      button.setAttribute("data-action", "modal#select")
      button.setAttribute("data-value", option.value)
      button.textContent = option.text

      questionTarget.appendChild(button)
    })
  }

  select(event) {
    this.selectTargets[this.currentModalIndex].value = event.target.dataset.value || ""
    this.next()
  }

  next() {
    this.currentModalIndex++

    if (this.currentModalIndex < this.labelTargets.length) {
      this.createQuestion()
    } else {
      this.hiddenModal()
    }
  }

  close() {
    this.hiddenModal()
  }
}
