import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberService } from '../../../core/services/member-service';
import { IMember } from '../../../types/member';

@Component({
  selector: 'app-member-detailed',
  imports: [AsyncPipe],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css',
})
export class MemberDetailed implements OnInit {
  private memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  protected member$?: Observable<IMember>;

  ngOnInit(): void {
    this.member$ = this.loadMember();
  }

  loadMember() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    return this.memberService.getMember(id);
  }
}
