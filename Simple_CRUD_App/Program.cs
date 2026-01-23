using Microsoft.EntityFrameworkCore;
using Simple_CRUD_App.Data.Contexts;
using Simple_CRUD_App.Data.Repositories;
using Simple_CRUD_App.Interfaces;
using Simple_CRUD_App.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<LocalDbContext>();

builder.Services.AddRazorPages();

builder.Services.AddScoped<ContactRepository>();
builder.Services.AddScoped<ContactService>();
var app = builder.Build();

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
