using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Kiosk.Backend.Models;

namespace Kiosk.Backend.Controllers
{
    public class ArticulosController : ApiController
    {
        private KioskoContainer db = new KioskoContainer();

        // GET: api/Articulos
        public IQueryable<Articulo> GetArticulos()
        {
            return db.Articulos;
        }

        // GET: api/Articulos/5
        [ResponseType(typeof(Articulo))]
        public async Task<IHttpActionResult> GetArticulo(int id)
        {
            Articulo articulo = await db.Articulos.FindAsync(id);
            if (articulo == null)
            {
                return NotFound();
            }

            return Ok(articulo);
        }

        // PUT: api/Articulos/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutArticulo(int id, Articulo articulo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != articulo.Id)
            {
                return BadRequest();
            }

            db.Entry(articulo).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArticuloExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Articulos
        [ResponseType(typeof(Articulo))]
        public async Task<IHttpActionResult> PostArticulo(Articulo articulo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Articulos.Add(articulo);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = articulo.Id }, articulo);
        }

        // DELETE: api/Articulos/5
        [ResponseType(typeof(Articulo))]
        public async Task<IHttpActionResult> DeleteArticulo(int id)
        {
            Articulo articulo = await db.Articulos.FindAsync(id);
            if (articulo == null)
            {
                return NotFound();
            }

            db.Articulos.Remove(articulo);
            await db.SaveChangesAsync();

            return Ok(articulo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ArticuloExists(int id)
        {
            return db.Articulos.Count(e => e.Id == id) > 0;
        }
    }
}