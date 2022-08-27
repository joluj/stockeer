import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

export type Dialog = {
  dialog: HTMLIonAlertElement;
  isPresent: Promise<void>;
};

export type DialogOptions = {
  title?: string;
  message: string;
};

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(private readonly alertController: AlertController) {}

  async ok(options: DialogOptions) {
    const dialog = await this.alertController.create({
      buttons: ['OK'],
      ...options,
    });

    return this.dialogReturnWrapper(dialog);
  }

  private dialogReturnWrapper(dialog: HTMLIonAlertElement): Dialog {
    return { dialog, isPresent: dialog.present() };
  }
}
