using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using ProjArchiGenerator.Models.AI;

public class AuthFilters : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        var userIdHeader = context.HttpContext.Request.Headers["userId"].FirstOrDefault();

        if(string.IsNullOrEmpty(userIdHeader))
        {
            context.Result = new JsonResult(new
            {
                Message = "Unauthorized"
            })
            {
                StatusCode = StatusCodes.Status401Unauthorized
            }; 
            return;
        }

        context.HttpContext.Request.Headers["userId"] = userIdHeader;
    }
    public void OnActionExecuted(ActionExecutedContext context) {

    }
}