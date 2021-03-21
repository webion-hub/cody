using Cody.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    internal class SearchResult
    {
        internal record Response(
            int Count,
            IQueryable<object> Values
        );

        public static async Task<Response> FormatAsync(
            IQueryable<object> results,
            int? limit,
            int? offset
        ) {
            var count = await results.CountAsync();
            var values = results
                .Skip(offset ?? 0)
                .MaybeTake(limit);

            return new Response(count, values);
        }
    }
}
