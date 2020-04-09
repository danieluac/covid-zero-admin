import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalComponent } from 'src/app/component/modal.component';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from '../../../service/auth.service';
import { AdminService } from '../../../service/admin.service';

@Component({
  selector: 'app-profissional-saude',
  templateUrl: './profissional-saude.component.html',
  styleUrls: ['./profissional-saude.component.css']
})
export class ProfissionalSaudeComponent implements OnInit {

  public categoriaForm = new FormGroup({
    nome : new FormControl('',[Validators.required]),
    profissao : new FormControl('',[Validators.required]),
    telefone : new FormControl('',[Validators.required]),
    id : new FormControl(null),
    numOrdem : new FormControl(' ',[Validators.required]),
    senha : new FormControl(' ',[Validators.required]),
  })
  public modalComp = new ModalComponent;

  public displayedColumns: string[] = ['nome','profissao','telefone','opcoes'];
  public dataSource: any;
  private updateData = false;

  @Output() setCategoria = new EventEmitter<string>();

  constructor(
    public adminService : AdminService, 
    private authService : AuthService, 
    ) { }
  ngOnInit(): void {
    this.listarCategorias();
  }
  setData(data : any){
    this.setCategoria.emit(data)
    this.dataSource  = new MatTableDataSource(data)
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  listarCategorias(){
    this.adminService.getCategoria().subscribe((data)=> {
      this.setData(data);
}, (error)=> {
this.authService.handleErrorWhenLogin(error)
});
  }
   public onSubmit(){

    if(this.updateData){
    
     this.adminService.UpdateCategoria(this.categoriaForm.value.nome,this.categoriaForm.value.id).subscribe(
       (response) => {         
          if(typeof response.Mensagem != "undefined")
            this.adminService.putMessage(response.Mensagem);
          if(typeof response.message != "undefined")
            this.adminService.putMessage(response.message);
          this.listarCategorias();
          this.modalComp.closeOneModal('cadCategoria')
          this.updateData = false;
          this.categoriaForm.reset();
        },
       (error) =>{
         this.authService.handleErrorWhenLogin(error);
       }
     )
    }else{
      this.adminService.registerCategoria(this.categoriaForm.value).subscribe(
        (response) => {
          this.categoriaForm.reset();
          if(typeof response.Messagem != "undefined")
            this.adminService.putMessage(response.Messagem);
          if(typeof response.message != "undefined")
            this.adminService.putMessage(response.message);
          this.listarCategorias();
          this.modalComp.closeOneModal('cadCategoria')
          this.categoriaForm.reset();
        },
        (error) => { console.log(error);  })
    }
  }
  onUpdate(data : {numOrdem: string,senha: string,telefone: string,profissao: string, nome : string, id : number}){
    this.modalComp.closeOneModal('listCategoria');
    this.categoriaForm.setValue(data);
    this.modalComp.openOneModal('cadCategoria');
    this.updateData = true;
  }
      onDelete(id : number){
        this.adminService.deleteCategoria(id).subscribe( (response) => {
          this.adminService.putMessage(response.Mensagem);
            this.listarCategorias();
          });
      }
  closeModal(){
    this.categoriaForm.reset();
    this.updateData = false;
    this.modalComp.closeOneModal('cadCategoria');
  }
}
