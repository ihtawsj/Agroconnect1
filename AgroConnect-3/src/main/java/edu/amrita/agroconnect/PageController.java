package edu.amrita.agroconnect;



import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping({"/login", "/login.html"})
    public String login() {
        return "login";
    }

    @GetMapping({"/register", "/register.html"})
    public String register() {
        return "register";
    }

}