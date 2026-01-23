using Microsoft.AspNetCore.Mvc;
using Simple_CRUD_App.Entities;
using Simple_CRUD_App.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;

namespace Simple_CRUD_App.Controllers
{
    [Route("api")]
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
            var contacts = await _service.GetAllContacts();
            return Content( JsonSerializer.Serialize(contacts), contentType: "application/json");
        }


    }
}
