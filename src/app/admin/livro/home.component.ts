import { AuthService } from '../../service/auth.service';
import { AdminService } from '../../service/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/component/modal.component';
import {MatTableDataSource} from '@angular/material/table';
import { ProvinciaComponent } from './provincia/provincia.component';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  livroForm = new FormGroup({
    suspeitos : new FormControl('',[Validators.required]),
    positivos : new FormControl('',[Validators.required]),
    negativos : new FormControl('',[Validators.required]),
    recuperados : new FormControl('',[Validators.required]),
    mortes : new FormControl('',[Validators.required]),
    quarentena : new FormControl('',[Validators.required]),
    provincia : new FormControl('',[Validators.required]),
    // municipio : new FormControl('',[Validators.required]),
    id : new FormControl(null),
  });
  categoriaData : any;
  public displayedColumns: string[] = ['suspeitos','positivos','negativos','recuperados','mortes','quarentena','provincia','acao'];
  public dataSource: any;
  public btnTitulo : string = "Cadastrar Novos Dados";
  public showFormLivro  :  boolean  = false;
  public updateData = false;
  public loadingLivroData = true;
  authorizeChild = false;
  
  public modalComp = new ModalComponent()
  @ViewChild(ProvinciaComponent) getdatasource;
  message : any;
  constructor(private adminService : AdminService,private authService : AuthService) { }

  ngOnInit(): void {
    this.listarlivros();
    
  }
  receiveProvincia($event) {
        this.setData( $event);
  }
  ngAfterContentInit() {
    
     this.authorizeChild = true
  }
  setData(data : any){
    if(typeof data.provincia != "undefined"){
      let value = [{
        provincia : data.provincia.nome,
        recuperados : data.recuperados,
        negativos : data.negativos,
        positivos : data.positivos,
        mortes : data.mortes,
        suspeitos : data.suspeitos,
        quarentena : data.quarentena,
        id : data.id,
      }];
      this.dataSource  = new MatTableDataSource(value);
    }else  this.dataSource = [];
  }
  listarlivros(){
          this.adminService.getDados("luanda").subscribe((data)=> {
            this.setData(data);
            this.loadingLivroData = false;
      }, (error)=> {
            this.authService.handleErrorWhenLogin(error)
      });
  }
  public onSubmit(){

    if(this.updateData){
    
     this.adminService.UpdateDados(this.livroForm.value).subscribe(
       (response) => { 
         this.adminService.putMessage(response.message); 
         this.updateData = false;
         this.livroForm.reset();
         this.setFormLivro();
        },
       (error) =>{ }
     )
    }else{
      this.adminService.registerDados(this.livroForm.value).subscribe(
        (respo) => {
          this.adminService.putMessage(respo.mensagem);
           this.livroForm.reset();
        },
        (error) => { })
    }
  }
  onUpdate(data : any){
    this.setFormLivro();
    this.livroForm.setValue(data);
    this.showFormLivro = true;
    this.updateData = true;
  }
  onDelete(id : number){
    this.adminService.deleteDados(id).subscribe( (response) => {
      this.adminService.putMessage(response.Mensagem);
        this.setData([]);
      },    
       (error) =>{ });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  setFormLivro() {
    if(this.showFormLivro === false)
    {
      this.showFormLivro = true ;
      this.btnTitulo = ' Listar Dados';
      this.updateData = false;
      this.livroForm.reset();
    }
    else {
      this.showFormLivro = false;
      this.btnTitulo = ' Cadastrar Novos Dados';
    }
  }

}
