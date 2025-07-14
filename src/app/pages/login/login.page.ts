import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { addIcons } from 'ionicons';
import { AuthService } from '../services/auth.service';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { PushNotifications } from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';


addIcons({
  'eye-outline': eyeOutline,
  'eye-off-outline': eyeOffOutline,
});

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  codigo = '';
  password = '';
  terminos = false;
  privacidad = false;
  showPassword = false;

  constructor(
    private toastCtrl: ToastController,
    private router: Router,
    private authService: AuthService,
    private platform: Platform
  ) { }

  async solicitarPermisosPush() {
    if (!this.platform.is('capacitor') || Capacitor.getPlatform() === 'web') {
      console.log('PushNotifications no disponible en web');
      return;
    }

    const permStatus = await PushNotifications.requestPermissions();
    if (permStatus.receive === 'granted') {
      this.showToast('Permiso de notificaciones concedido');
      PushNotifications.register();
    } else {
      this.showToast('Permiso de notificaciones denegado');
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {

    if (!this.codigo || !this.password) {
      this.showToast('Debes llenar todos los campos');
      return;
    }

    if (!this.terminos || !this.privacidad) {
      this.showToast('Debes aceptar los Términos y el Aviso de privacidad');
      return;
    }

    const body = {
      api_key: 'be65a08aa1121cf6ffe52a80743c8cef',
      campaign: '4u',
      participation: {
        'codigo-de-cliente': this.codigo,
        password: this.password
      }
    };

    console.log('Datos enviados al backend:', body);

    try {
      const response = await firstValueFrom(this.authService.login(body));
      console.log('Respuesta del login:', response);
      console.log('Participant:', response.participant);

      if (response.token && response.participant && response.participant.uid) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('distinct_id', response.participant.uid);
        localStorage.setItem('name', response.participant.name);
        localStorage.setItem('email', response.participant.email);
        console.log('Token y distinct_id guardados:', response.token, response.participant.uid);
        this.router.navigateByUrl('/dashboard');

        this.solicitarPermisosPush();
      } else {
        this.showToast('Error de login: datos incompletos');
      }
    } catch (err) {
      console.error('Error en login:', err);
      this.showToast('Credenciales incorrectas o error en la API');
    }
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
