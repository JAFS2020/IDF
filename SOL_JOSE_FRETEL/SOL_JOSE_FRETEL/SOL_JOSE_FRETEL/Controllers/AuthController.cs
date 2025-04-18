using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

public class AuthController : Controller
{
    [HttpGet]
    public IActionResult Login()
    {
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Login(LoginModel model)
    {
        if (ModelState.IsValid)
        {
            return RedirectToAction("Dashboard", "Home", new { email = model.Email });
        }
        return View(model);
    }
}