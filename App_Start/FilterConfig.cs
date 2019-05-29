using System.Web;
using System.Web.Mvc;

namespace Taraz.Paladium.WPA
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
