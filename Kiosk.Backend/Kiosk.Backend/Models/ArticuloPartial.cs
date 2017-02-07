using Kiosk.Backend.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kiosk.Backend.Models
{
    public partial class Articulo
    {
        public IEnumerable<string> PTags
        {
            get
            {
                return this.Tags.Split(';');
            }
        }

        public string PImagen
        {
            get
            {
                return $"{Environment.GetEnvironmentVariable(Constants.URL_CARPETA_IMAGENES)}/{this.Imagen}";
            }
        }
    }
}