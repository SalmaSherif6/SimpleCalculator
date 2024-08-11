using Microsoft.AspNetCore.Http;
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
        [HttpGet("SumFromOne_Youssef/{number}")]
        public IActionResult SumFromOne_Youssef(int number)
        {
            if (number <= 0)
            {
                return BadRequest("Number must be greater than 0");
            }

            int sum = 0;
            for (int i = number; i > 0; i--)
            {
                sum += i;
            }
            return Ok("Sum is: " + sum);
        }


        [HttpGet("SumFromOne_Sarah/{number}")]
        public IActionResult SumFromOne_Sarah(int number)
        {
            int sum = 0;
            while (number > 0)
            {
                sum = sum + number;
                number = number - 1;
            }
            return Ok("Sum : " + sum);
        }

        [HttpGet("SumFromOne_Zeyad/{number}")]
        public IActionResult SumFromOne_Zeyad(int number)
        {
            int sum = 0;
            for (int i = number; i > 0; i--)
            {
                sum += i;
            }
            return Ok("Sum is :" + sum);
        }


       


    }



}
