﻿using Cody.Extensions;
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
            int Total,
            IQueryable<object> Values
        );

        public static async Task<Response> FormatAsync(
            IQueryable<object> results,
            int? limit,
            int? offset
        ) {
            if (limit is < 0 || offset is < 0)
                return new Response(0, results.Take(0));

            var total = await results.CountAsync();
            var values = results
                .Skip(offset ?? 0)
                .MaybeTake(limit);

            return new Response(total, values);
        }
    }
}
