﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NewCalculator.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalculatorController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Hello, I am Your API");
        }
        [HttpGet("GetSum/{number1}/{number2}")]
        public IActionResult GetSum(int number1,int number2)
        {
            int  sum = number1 + number2;
            return Ok("Sum : "+sum);
        }


    }

}
