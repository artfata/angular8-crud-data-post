/**
 * Untuk mempercepat dan mempermudah pekerjaan pada kasus ini semua component akan kita definisikan disini.
 * is not good for enterprise app. But for this case, I think is not problem.
 */

import { PostService } from './service/post.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

interface PostData{
  id: number;
  title: string;
  body: string;
  userId: number;
}

let posts: PostData[];

const userIdData = [
  {id: 1, name: 'one'},
  {id: 2, name: 'two'},
  {id: 3, name: 'tree'},
  {id: 4, name: 'four'},
  {id: 5, name: 'five'}
]

// App component
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = ['id', 'title', 'body', 'userId', 'setting'];
  dataSource: MatTableDataSource<PostData>;
  isError: boolean = false;
  isLoading: boolean = true;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private service: PostService,
    public dialog: MatDialog
  ){
    
  }

  ngOnInit(){
    this.service.getAll()
      .subscribe(
        (data: PostData[]) => {
          posts = data
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(posts)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, error => {
          this.isError = true;
          this.isLoading = false;     
        }
      )
    
  }

  consolePosts(){
    console.log(posts)
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '80%'
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.isSucces){
          posts = result.data
          this.dataSource = new MatTableDataSource(result.data)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else null
    })
    
  }

  openUpdateDialog(resource){
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '80%',
      data: resource
    })
    dialogRef.afterClosed()
      .subscribe(result => {
        if(result && result.isSucces){
          posts = result.data
          this.dataSource = new MatTableDataSource(result.data)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else null
      })
  }

  openDeleteDialog(resource){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: resource
    })
    dialogRef.afterClosed()
      .subscribe(result => {
        if(result && result.isSucces){
          posts = result.data
          this.dataSource = new MatTableDataSource(result.data)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else null
      })
  }

}

// Add component
@Component({
  selector: 'add-dialog',
  templateUrl: './template/add-dialog.component.html',
  styleUrls: ['./app.component.scss']
})
export class AddDialogComponent {
  userId = userIdData 
  dataPost = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(199)
    ]],
    body: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(599)
    ]],
    userId: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private service: PostService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: PostData
  ){}

  closeDialog(){
    this.dialogRef.close()
  }

  onSubmit(data){
    this.service.create(data)
      .subscribe(
        res => {
          this._snackBar.open("Post success fully added : )", "close", {
            duration: 5000
          })
          this.dialogRef.close({
            isSucces: true,
            data: [ res, ...posts]
          })  
        }, error => {
          this._snackBar.open("Ups, fail to add post", "close", {
            duration: 5000
          })
          this.dialogRef.close()
        }
      )
  }

}

// Update component
@Component({
  selector: 'update-dialog',
  templateUrl: './template/update-dialog.component.html',
  styleUrls: ['./app.component.scss']
})
export class UpdateDialogComponent {
  userId = userIdData 
  dataPost = this.fb.group({
    title: [this.data.title, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(199)
    ]],
    body: [this.data.body, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(599)
    ]],
    userId: [this.data.userId, Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private service: PostService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostData
  ){}

  closeDialog(){
    this.dialogRef.close()
  }

  onSubmit(resource){
    let anotherPosts = posts.filter(p => p.id != this.data.id)
    let newPosts = [{id: this.data.id, ...resource} ,...anotherPosts]

    this.service.update(this.data.id, resource)
      .subscribe(
        res => {
          this._snackBar.open("Post success fully updated : )", "close", {
            duration: 5000
          })
          this.dialogRef.close({
            isSucces: true,
            data: newPosts
          })  
        }, error => {
          this._snackBar.open("Ups, fail to update post", "close", {
            duration: 5000
          })
          this.dialogRef.close({
            isSucces: false,
            data: []
          }) 
        }
      )
  }
}

// Delete component
@Component({
  selector: 'delete-dialog',
  templateUrl: './template/delete-dialog.component.html',
  styleUrls: ['./app.component.scss']
})
export class DeleteDialogComponent {
  constructor(
    private service: PostService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostData
  ){}
  
  closeDialog(){
    this.dialogRef.close()
  }

  onDelete(){
    let newPosts = posts.filter(p => p.id != this.data.id)
    
    this.service.delete(this.data.id)
      .subscribe(
        res => {
          this._snackBar.open("Delete some post successfully : )", "close", {
            duration: 5000
          })
          this.dialogRef.close({
            isSucces: true,
            data: newPosts
          })              
        }, error => {
          this._snackBar.open("Ups, fail to delete post", "close", {
            duration: 5000
          })
          this.dialogRef.close({
            isSucces: false,
            data: []
          })            
        }
      )
  }
}