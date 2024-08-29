using Microsoft.AspNetCore.Mvc;
using NewCalculator.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test.Controllers
{
    public class CalculatorTest
    {
        [Fact]
        public void Calculator_GetSum_ReturnOk()
        {
            //Arrange
            var controller = new CalculatorController();

            //ACT
            OkObjectResult sum = controller.GetSum(3, 6) as OkObjectResult;

            //Assert
            Assert.Equal("Sum : 8", sum.Value);
        }
    }
}
