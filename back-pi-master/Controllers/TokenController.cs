using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using back_pi.BLL;
using back_pi.DAL.DTO;
using back_pi.Utils;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using back_pi.DAL.Models;
using AutoMapper;

namespace back_pi.Controllers
{
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController:ControllerBase
    {
        private readonly IUsuarioBll _usuarioBll;
        private ILoggerManager _logger;
        private IMapper _mapper;
        
        public TokenController(IUsuarioBll usuarioBll, ILoggerManager logger, IMapper mapper)
        {
            _usuarioBll = usuarioBll;
            _logger = logger;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Create([FromBody] LoginDTO dados)
        {
            var encontrado = _usuarioBll.ObterPorLogin(dados.Login);

            if (encontrado != null)
            {
                if (dados.Login == encontrado.Login && dados.Senha == encontrado.Senha)
                {
                    var statusToken = GenerateToken(dados.Login, encontrado);
                    return Ok(new ObjectResult(statusToken));
                    
                    /* if (encontrado.PerfilSuper)
                    {
                        var statusToken = GenerateToken(dados.Login, encontrado);
                        return Ok(new ObjectResult(statusToken));
                    }
                    else if (!encontrado.PerfilSuper)
                    {
                        var statusToken = GenerateToken(dados.Login, encontrado);
                        return Ok(new ObjectResult(statusToken));
                    }
                    else
                    {
                        return BadRequest(new JsonResult("Usuário não tem permissão."));
                    } */
                }
            }

            return BadRequest(new JsonResult("Usuário ou senha incorreto."));
        }

        private StatusTokenDTO GenerateToken(string login, Usuario objeto)
        {
            var claims = new Claim[]
            {
                // Define as claims 
                new Claim(ClaimTypes.Name, login),
                new Claim(JwtRegisteredClaimNames.Nbf, new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds().ToString()),
                new Claim(JwtRegisteredClaimNames.Exp, new DateTimeOffset(DateTime.Now.AddDays(1)).ToUnixTimeSeconds().ToString()),
            };

            // Gera o token
            SymmetricSecurityKey symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("HJaM5dvQy5WUEQ6LPR7yRrcO4m2Mse4u94FMsgXtMjrc66XeM34sdPWQ2ilEA9fo"));
            SigningCredentials signingCredential = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            JwtHeader jwtHeader = new JwtHeader(signingCredential);
            JwtPayload jwtPayload = new JwtPayload(claims);
            JwtSecurityToken token = new JwtSecurityToken(jwtHeader, jwtPayload);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);


            var statusToken = new StatusTokenDTO
            {
                Nome = objeto.Nome,
                Token = tokenString
            };

            return statusToken;
        }

    }
}
