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

  static targets = ["modal", "nameSelect", "ageSelect"];

  connect() {
    this.userData = {}; // ユーザーデータの初期化
  }

  startFromName(event) {
    event.preventDefault();
    this.currentModalIndex = 0; // 現在のモーダルのインデックスを保持
    this.showModal(0); // 名前選択モーダルを表示
  }

  startFromAge(event) {
    event.preventDefault();
    this.currentModalIndex = 1; // 現在のモーダルのインデックスを保持
    this.showModal(1); // 年齢選択モーダルを表示
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
    this.updateFormFields(); // フォームを更新
    this.next(); // 次のモーダルを表示
  }

  selectAge(event) {
    this.userData.age = event.target.dataset.value; // 年齢を保存
    this.updateFormFields(); // フォームを更新
    this.close(); // モーダルを閉じる
  }

  next() {
    this.currentModalIndex++;
    if (this.currentModalIndex < this.modalTargets.length) {
      this.showModal(this.currentModalIndex);
    }
  }

  updateFormFields() {
    // フォームに`userData`の値を反映
    if (this.nameSelectTarget) {
      this.nameSelectTarget.value = this.userData.name || ""; // 名前
    }
    if (this.ageSelectTarget) {
      this.ageSelectTarget.value = this.userData.age || ""; // 年齢
    }
  }

  close() {
    // モーダルを閉じるだけでデータをリセットしない
    this.hideAllModals();
  }
}
