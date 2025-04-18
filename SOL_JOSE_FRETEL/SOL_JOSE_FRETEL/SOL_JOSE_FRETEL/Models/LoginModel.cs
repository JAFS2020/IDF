using System.ComponentModel.DataAnnotations;

public class LoginModel
{
    [Required(ErrorMessage = "Email es obligatorio")]
    [EmailAddress(ErrorMessage = "Formato de email inválido")]
    [RegularExpression(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", ErrorMessage = "Formato de email inválido")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Contraseña es obligatoria")]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$",
        ErrorMessage = "Debe contener mayúsculas, minúsculas, números y caracteres especiales")]
    public string Password { get; set; }
}