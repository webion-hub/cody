using Cody.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers
{
    internal class SearchResponse
    {
        public static async Task<object> FormatAsync(
            IQueryable<object> results,
            int? limit,
            int? offset
        ) {
            var count = await results.CountAsync();
            var resultsList = results
                .Skip(offset ?? 0)
                .MaybeTake(limit);

            return new { count, resultsList };
        }
    }
}
