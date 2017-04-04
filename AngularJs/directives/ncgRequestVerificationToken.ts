///<reference path="../outerReferences.ts"/>

/**
 * Created by Hassan on 1/16/2017.
 */

/*
 * @example
 * C# Code:
 * <code>
 * public class AntiForgeryValidate : ActionFilterAttribute
 * {
     *    public override void OnActionExecuting(System.Web.Http.Controllers.HttpActionContext actionContext)
     *    {
     *        string cookieToken = "";
     *        string formToken = "";
     *        IEnumerable<string> tokenHeaders;
     *        if (actionContext.Request.Headers.TryGetValues("RequestVerificationToken", out tokenHeaders))
     *        {
     *            string[] tokens = tokenHeaders.First().Split(':');
     *            if (tokens.Length == 2)
     *            {
     *                cookieToken = tokens[0].Trim();
     *                formToken = tokens[1].Trim();
     *            }
     *        }
     *        try
     *        {
     *            System.Web.Helpers.AntiForgery.Validate(cookieToken, formToken);
     *            base.OnActionExecuting(actionContext);
     *        }
     *        catch
     *        {
     *            actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
     *            return;
     *        }
     *    }
     * }
 *
 *
 * public static class AntiForgeryExtension
 * {
     *     public static string RequestVerificationToken(this System.Web.Mvc.HtmlHelper helper)
     *    {
     *        return string.Format("ncg-request-verification-token={0}", GetTokenHeaderValue());
     *    }
     *    private static string GetTokenHeaderValue()
     *    {
     *        string cookieToken, formToken;
     *        System.Web.Helpers.AntiForgery.GetTokens(null, out cookieToken, out formToken);
     *        return cookieToken + ":" + formToken;
     *    }
     * }
 * </code>
 *
 * Razor:
 * <code>
 * <html lang="en" ng-app="chatSystem" ng-controller="mainController">
 *      <head @Html.RequestVerificationToken()>
 *          ...
 *     </head>
 *     ...
 * </html>
 * </code>
 */

module AngularUtility {
    "use strict";

    import IScope = angular.IScope;
    import INgModelController = angular.INgModelController;
    import IAugmentedJQuery = angular.IAugmentedJQuery;
    import IRepeatScope = angular.IRepeatScope;
    import IAttributes = angular.IAttributes;
    import IHttpService = angular.IHttpService;

    export interface INcgRequestVerificationTokenAttributes extends ng.IAttributes {
        ncgRequestVerificationToken: string;
        dataNcgRequestVerificationToken: string;
    }

    class NcgRequestVerificationTokenDirective implements ng.IDirective {
        link: angular.IDirectiveLinkFn|angular.IDirectivePrePost;

        constructor(private $http:IHttpService) {

            this.link = function (scope:IRepeatScope, element:IAugmentedJQuery, attrs:INcgRequestVerificationTokenAttributes) {
                $http.defaults.headers.common['RequestVerificationToken'] =
                    attrs.ncgRequestVerificationToken || attrs.dataNcgRequestVerificationToken || "no request verification token";
            }
        }

        static instance(): ng.IDirective {
            //return new OnRepeaterFinishRender();
            var directive: ng.IDirectiveFactory = ($http:ng.IHttpService)=>new NcgRequestVerificationTokenDirective($http);
            directive.$inject=["$http"];
            return directive;
        }
    }

    angular.module("angularUtility")
        .directive("ncgRequestVerificationToken", <any>NcgRequestVerificationTokenDirective.instance())
        .directive("dataNcgRequestVerificationToken", <any>NcgRequestVerificationTokenDirective.instance());
}