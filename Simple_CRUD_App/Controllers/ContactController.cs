using Microsoft.AspNetCore.Mvc;
using Simple_CRUD_App.Entities;
using Simple_CRUD_App.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;

namespace Simple_CRUD_App.Controllers
{
    [Route("api1")]
    [ApiController]
    public class ContactController : Controller
    {
        private readonly ContactService _service;

        public ContactController(ContactService service)
        {
            _service = service;
        }
        
        [HttpGet("contacts")]
        public async Task<IActionResult> GetAllContacts()
        {
            var contacts = await _service.GetAllContactsAsync();
            var jsonContactList = JsonSerializer.Serialize(contacts);
            return Content(jsonContactList, contentType: "application/json");
        }

        [HttpPost("contacts")]
        public async Task<IActionResult> PostContact(Contact contact) { 
            return Content( JsonSerializer.Serialize(contact), contentType: "application/json");
        }

        [HttpGet("contacts/{id}")]
        public async Task<IActionResult> GetContact(int id) { 
            return Content( "JsonSerializer.Serialize(contact)", contentType: "application/json");
        }

        [HttpPatch("contacts/{id}")]
        public async Task<IActionResult> UpdateContact(Contact contact) { 
            return Content("", contentType: "application/json") ;
        }

        [HttpDelete("contacts/{id}")]
        public async Task<IActionResult> DeleteContact(int id) {
            //return Results.BadRequest();
            return Content("", contentType: "application/json");
        }



    }
}
