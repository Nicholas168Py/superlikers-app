import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage {
  filtro = 'cartones';
  kpis: any[] = [];
  kpisFiltrados: any[] = [];
  nombre = '';
  codigo = '';
  promedioKPI = 0;

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    this.nombre = localStorage.getItem('name') || '';
    this.codigo = localStorage.getItem('distinct_id') || '';
    try {
      const response: any = await firstValueFrom(this.getKpis());

      if (response && response.data && response.data.entries) {
        this.kpis = this.procesarKPIsDesdeEntries(response.data.entries);
        console.log('KPIs procesados:', this.kpis);
      } else {
        throw new Error('Respuesta inválida o vacía');
      }
    } catch (error) {
      console.error('Error al obtener KPIs desde API. Usando mock local.', error);
      this.kpis = [];
    }

    this.filtrarKPIs();
  }

  getKpis() {
    const token = localStorage.getItem('token');
    const distinct_id = localStorage.getItem('distinct_id');

    if (!token || !distinct_id) {
      throw new Error('Token o distinct_id no encontrados');
    }

    const url = `http://localhost/superlikers-api/proxy-kpi.php?token=${token}&distinct_id=${distinct_id}`;
    return this.http.post(url, {});
  }

  procesarKPIsDesdeEntries(entries: any[]): any[] {
    const kpis: any[] = [];

    entries.forEach(entry => {
      const data = entry.data;
      if (!data) return;

      for (const key in data) {
        const valor = parseFloat(data[key]);
        if (isNaN(valor)) continue;

        const match = key.match(/^(.*?)_(meta_mes|avance_actual)_(cartones|hectolitros)$/i);
        if (match) {
          const nombre = match[1]; // nombre del avance
          const tipoDato = match[2]; // meta_mes o avance_actual
          const tipo = match[3]; // cartones o hectolitros

          let kpi = kpis.find(k => k.nombre === nombre && k.tipo === tipo);
          if (!kpi) {
            kpi = {
              nombre,
              tipo,
              meta: 0,
              avance: 0,
              porcentaje: 0
            };
            kpis.push(kpi);
          }

          if (tipoDato === 'meta_mes') {
            kpi.meta = valor;
          } else if (tipoDato === 'avance_actual') {
            kpi.avance = valor;
          }

          if (kpi.meta > 0) {
            kpi.porcentaje = Math.round((kpi.avance / kpi.meta) * 100);
          }
        }
      }
    });

    return kpis;
  }

  filtrarKPIs() {
    // Filtra ignorando mayúsculas por seguridad
    this.kpisFiltrados = this.kpis.filter(
      kpi => kpi.tipo.toLowerCase() === this.filtro.toLowerCase()
    );

    // Log para ver qué está pasando
    console.log('Filtro aplicado:', this.filtro);
    console.log('Tipos disponibles:', this.kpis.map(k => k.tipo));
    console.log('KPIs filtrados:', this.kpisFiltrados);

    // Calcular promedio
    const total = this.kpisFiltrados.reduce((sum, kpi) => sum + kpi.porcentaje, 0);
    this.promedioKPI = this.kpisFiltrados.length
      ? Math.round(total / this.kpisFiltrados.length)
      : 0;
  }

  getColorClass(nombre: string): string {
    nombre = nombre.toLowerCase();
    if (nombre.includes('volumen')) return 'volumen';
    if (nombre.includes('marketplace')) return 'marketplace';
    if (nombre.includes('premium')) return 'premium';
    if (nombre.includes('innovaciones')) return 'innovaciones';
    if (nombre.includes('retornable')) return 'retornable';
    return 'default';
  }

  getNombreFormateado(nombre: string): string {
    return nombre
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  }
}