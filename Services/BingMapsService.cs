using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Cody.Services
{
    public class BingMapsService
    {
        private static readonly string BING_MAPS_KEY = 
            "Atk8WqFahBgE88OPqmaBcGtaXp-eW-oaL3VjFrtRPscXG5sq1xwk69zAWanavyH_";


        public HttpClient Client { get; init; }

        public BingMapsService(HttpClient client)
        {
            client.BaseAddress = new Uri("https://dev.virtualearth.net/");
            Client = client;
        }

        public async Task<string> SearchLocationAsync(string query)
        {
            var uri = $"REST/v1/Locations?{GetQueryString(query)}";
            var request = new HttpRequestMessage(HttpMethod.Get, uri);

            var response = await Client.SendAsync(request);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsStringAsync();
        }

        private static string GetQueryString(string query)
        {
            var parameters = new[] {
                $"key={BING_MAPS_KEY}",
                $"query={Uri.EscapeDataString(query)}",
                $"maxResults={10}",
                $"culture={"it-IT"}",
            };

            return string.Join('&', parameters);
        }
    }
}
