import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { userData } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent implements OnInit {

  subscription = new Subscription();
  usersData$ : Observable<[userData]> = this.userService.getUsers();
  constructor(protected userService: UserService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  deleteUser(id: number) {
    this.subscription.add(
      this.userService.deleteUser(id).subscribe((data: any) => {
        this.usersData$ = this.userService.getUsers();
        this.cd.detectChanges();
      }, (error: any) => {
        console.log(error.error)
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
