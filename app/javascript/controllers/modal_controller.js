import { Controller } from "@hotwired/stimulus"
import { Modal } from "bootstrap"

// Connects to data-controller="modal"
export default class extends Controller {
  // // `connect()`はStimulusのライフサイクルコールバックの1つ
  // // コントローラーがHTML要素にアタッチされた時（=HTML要素が画面に表示された時）に実行される
  // connect() {
  //   // モーダル生成
  //   this.modal = new Modal(this.element)

  //   // モーダルを表示する
  //   this.modal.show()
  // }

  // // アクション定義
  // // 保存成功時にモーダルを閉じる
  // close(event) {
  //   // event.detail.successは、レスポンスが成功ならtrueを返す
  //   // バリデーションエラー時はモーダルを閉じたくないので、成功時のみ閉じる
  //   if (event.detail.success) {
  //     // モーダルを閉じる
  //     this.modal.hide()
  //   }
  // }

  static targets = ["modal", "nameField", "ageField"];

  connect() {
    this.resetModals(); // モーダルの初期化
  }

  start() {
    this.resetModals(); // モーダルをリセット
    this.showModal(0);  // 最初のモーダルを表示
  }

  resetModals() {
    this.currentModalIndex = 0; // モーダルのインデックスをリセット
    this.userData = {};         // 入力されたデータをリセット
    this.hideAllModals();       // すべてのモーダルを非表示にする
  }

  showModal(index) {
    this.modalTargets.forEach((modal, i) => {
      modal.style.display = i === index ? "block" : "none";
    });
  }

  hideAllModals() {
    this.modalTargets.forEach((modal) => {
      modal.style.display = "none";
    });
  }

  selectName(event) {
    this.userData.name = event.target.dataset.value; // 名前を保存
    this.updateFormFields(); // フォームに値を更新
    this.next();
  }

  selectAge(event) {
    this.userData.age = event.target.dataset.value; // 年齢を保存
    this.updateFormFields(); // フォームに値を更新
    this.next();
  }

  next() {
    this.currentModalIndex++;
    if (this.currentModalIndex < this.modalTargets.length) {
      this.showModal(this.currentModalIndex);

      // 最後のモーダルならデータを表示
      if (this.currentModalIndex === this.modalTargets.length - 1) {
        this.updateResult(); // 結果を表示
      }
    }
  }

  updateFormFields() {
    // モーダルの値をフォームに反映
    if (this.nameFieldTarget) {
      this.nameFieldTarget.value = this.userData.name || ""; // 名前を名前フィールドに
    }
    if (this.ageFieldTarget) {
      this.ageFieldTarget.value = this.userData.age || ""; // 年齢を年齢フィールドに
    }
  }

  updateResult() {
    // 結果を表示
    // const resultText = `名前: ${this.userData.name}, 年齢: ${this.userData.age}`;
    // this.summaryTarget.textContent = resultText;
  }

  close() {
    this.hideAllModals(); // すべてのモーダルを非表示にする
  }
}
