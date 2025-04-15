import { Component, inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { UploadEvent } from 'primeng/fileupload';
import { FileUploadHandlerEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {

  private productoService = inject(ProductoService)

  loading:boolean=false;
  totalRecords!:number;
  buscador:string='';
  visible:boolean=false;
  producto_id:number=-1;
  products: any[] = [];
  cols: any[] = [];
  uploadedFiles:any[]=[];


  categorias: any = [
    { name: 'Ropa Dama', code: 'RD' },
    { name: 'Ropa Caballero', code: 'RC' },
    { name: 'Herramientas', code: 'He' },
    { name: 'Tecnologia', code: 'Tec' },
    { name: 'Hogar', code: 'Hgr' }
  ]

  constructor() {
    this.productoService.funListar().subscribe(
      (res: any) => {
        this.products = res.data
      }
    )
  }

  loadProductos(event:any){
    let page=(event.first/event.rows)+1
    this.listar(page,event.rows)
    console.log(event)
  }

  listar(page=1, limit=10){
    this.productoService.funListar(page,limit, this.buscador).subscribe(
      (res:any)=>{
        this.products=res.data;
        this.totalRecords=res.total;
        this.loading=false;
      }
    )
  }
  buscar(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.listar();
    } else if (this.buscador === '') {
      this.listar(); 
    }
  }

  

  openNew() {

  }

  editProduct(prod: any) {

  }

  deleteProduct(prod: any) {

  }

  subirImagen(event:any){
    console.log(event.files[0])
    let formData=new FormData();
    formData.append("imagen", event.files[0])

    this.productoService.actualizarImagen(formData, this.producto_id).subscribe(
      (res:any)=>{
        console.log(res);
        this.visible=false;
        this.producto_id=-1;
        this.listar();
      }
    )
  }

  openDialogImagen(id:number){
    this.visible=true
    this.producto_id=id
  }


}
