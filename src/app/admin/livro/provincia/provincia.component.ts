import { Component, OnInit, Output,EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalComponent } from 'src/app/component/modal.component';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from '../../../service/auth.service';
import { AdminService } from '../../../service/admin.service';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.css']
})
export class ProvinciaComponent implements OnInit {

  public ProvinciaForm = new FormGroup({
    provincia : new FormControl('',[Validators.required]),
    longitude : new FormControl('',[Validators.required]),
    latitude : new FormControl('',[Validators.required]),
  })
  public modalComp = new ModalComponent;

  public displayedColumns: string[] = ['provincia','longitude','latitude','opcoes'];
  public dataSource: any;
  private updateData = false;

  @Output() setProvincia = new EventEmitter<string>();

  constructor(
    public adminService : AdminService, 
    private authService : AuthService, 
    ) { }
  ngOnInit(): void {
    this.listarProvincia();
  }
  setData(data : any){
    this.setProvincia.emit(data)
    this.dataSource  = new MatTableDataSource(data)
  }
  onViewData (provincia: string){

    this.adminService.getDados(provincia).subscribe((data)=> {
      this.setProvincia.emit(data);
      if(typeof data.mensagem != "undefined")
          this.adminService.putMessage(data.mensagem); 
        this.modalComp.closeOneModal('listProvincia');
    }, (error)=> {
          this.authService.handleErrorWhenLogin(error)
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  listarProvincia(){
    this.adminService.getProvincia().subscribe((data)=> {
      this.setData(data);
}, (error)=> {
this.authService.handleErrorWhenLogin(error)
});
  }
   public onSubmit(){

    if(this.updateData){
    
     this.adminService.UpdateProvincia(this.ProvinciaForm.value.nome,this.ProvinciaForm.value.id).subscribe(
       (response) => { 
         this.adminService.putMessage(response.message); 
         this.setData(response.result);
         this.modalComp.closeOneModal('cadProvincia')
         this.updateData = false;
         this.ProvinciaForm.reset();
        },
       (error) =>{
         this.authService.handleErrorWhenLogin(error);
       }
     )
    }else{
      this.adminService.registerProvincia(this.ProvinciaForm.value).subscribe(
        (response) => {
          this.ProvinciaForm.reset();
          this.adminService.putMessage(response.message);
         this.listarProvincia();
          this.modalComp.closeOneModal('cadProvincia')
        },
        (error) => { console.log(error);  })
    }
  }
  onUpdate(data : {latitude: string,longitude: string, provincia : string}){
    this.modalComp.closeOneModal('listProvincia');
    this.ProvinciaForm.setValue(data);
    this.modalComp.openOneModal('cadProvincia');
    this.updateData = true;
  }
      onDelete(id : number){
        this.adminService.deleteProvincia(id).subscribe( (response) => {
          this.adminService.putMessage(response.Mensagem);
            this.listarProvincia();
          });
      }
  closeModal(){
    this.ProvinciaForm.reset();
    this.updateData = false;
    this.modalComp.closeOneModal('cadProvincia');
  }
}
