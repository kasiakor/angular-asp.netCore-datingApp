import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { MemberService } from '../../../core/services/member-service';
import { IPhoto } from '../../../types/member';

@Component({
  selector: 'app-member-photos',
  imports: [],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css',
})
export class MemberPhotos {
  private memberService = inject(MemberService);
  private route = inject(ActivatedRoute);

  protected photos = toSignal(
    // reads parameters from the parent route
    this.route.parent!.paramMap.pipe(
      // changes the route params into just the id.
      map((params) => params.get('id')),
      // keep only truthy values
      filter((id): id is string => !!id),
      // when id changes cancel old request and start a new one
      switchMap((id) => this.memberService.getMemberPhotos(id)),
    ),
    { initialValue: [] as IPhoto[] },
  );
}
