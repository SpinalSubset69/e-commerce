using System;

namespace API.Errors
{
    public class ApiResponse
    {
        public int StatusCode {get; set;}
        public string Message {get; set;}        
        
        //We may not have a message
        public ApiResponse(int statusCode, string message= null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefualtMessageForStatusCode(StatusCode);
        }

        private string GetDefualtMessageForStatusCode(int statusCode)
        {
            return statusCode switch 
            {                
                400 => "A bad request you have made",
                401 => "Authorized you are not",
                404 => "Resources found it was not",
                500 => "Errors are the path to de dark side, Error lead to Anger, Anger leads to hate, hates leads to career change",
                _ => null //Default case
            };
        }

        
    }
}