using Simple_CRUD_App.Data.Contexts;
using Simple_CRUD_App.Data.Repositories;
using Simple_CRUD_App.Entities;
using Simple_CRUD_App.Interfaces;
using Simple_CRUD_App.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<LocalDbContext>();

builder.Services.AddRazorPages();

// DI
builder.Services.AddScoped<IRepository<Contact>, ContactRepository>();
builder.Services.AddScoped<ContactService>();
var app = builder.Build();

//Ёндопоинты api

//
app.MapGet("/api/contacts", async (ContactService service) => await service.GetAllContactsAsync());
//
app.MapGet("/api/contacts/{id}", async (ContactService service, int id) => {
    var contact =  await service.GetContactByIdAsync(id);
    return contact is null ?  Results.NotFound() : Results.Ok(contact);
});

//
app.MapPost("/api/contacts", async (ContactService service, Contact? contact) => {
    if(contact == null)
    {
        return Results.BadRequest(); 
    }
    var createdContact = await service.CreateContactAsync(contact);
    return createdContact is null ? Results.BadRequest() : Results.Created();
});

//
app.MapPut("/api/contacts/{id}", async (ContactService service, int id, Contact? contact) => {
    if(contact == null || id < 0)
    {
        return Results.BadRequest();
    }
    var result = await service.UpdateAsync(id, contact);
    return result ? Results.NoContent() : Results.NotFound();
});

//
app.MapDelete("/api/contacts/{id}", async (ContactService service, int id) => {
    var result = await service.DeleteByIdAsync(id);
    return result ? Results.NoContent() : Results.NotFound();
});


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.MapControllers();

app.Run();
