﻿using Microsoft.AspNetCore.Mvc;
using NewCalculator.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestCalculator.Controllers
{
    public class CalculatorTester
    {
        [Fact]
        public void GetSum_ReturnsCorrectSum()
        {
            // Arrange
            var controller = new CalculatorController();
            int num1 = 3;
            int num2 = 5;


            // Act
            var sum = controller.GetSum(num1, num2) as OkObjectResult;

            
            // Assert
            Assert.Equal("Sum : " + 8, sum.Value);

        }
    }
}
