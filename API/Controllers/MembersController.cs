
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]

    public class MembersController(IMemberRepository memberRepository) : BaseApiController
    {
        [HttpGet]   // localhost:5001/api/members
        public async Task<ActionResult<IReadOnlyList<Member>>> GetMembers()
        {
            var members = await memberRepository.GetMembersAsync();

            return Ok(members);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMember(string id)
        {
            var member = await memberRepository.GetMemberByIdAsync(id);

            if (member == null) return NotFound();

            return Ok(member);
        }

        [Authorize]
        [HttpGet("{id}/photos")]
        public async Task<ActionResult<IReadOnlyList<Photo>>> GetMemberPhotos(string id)
        {
            var photos = await memberRepository.GetPhotosForMemberAsync(id);

            return Ok(photos);
        }
    }
}
