using Microsoft.AspNetCore.Mvc;

public class HomeController : Controller
{
    public IActionResult Dashboard(string email)
    {
        ViewData["UserEmail"] = email;
        return View();
    }
}