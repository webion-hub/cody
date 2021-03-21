using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Responses
{
    internal class ResponsePipelineCallback<T>
    {
        public Func<ResponsePipelineResults, T> Callback { get; init; }


        public static implicit operator ResponsePipelineCallback<T>(Func<ResponsePipelineResults, Task<T>> callback) => new(callback);
        public static implicit operator ResponsePipelineCallback<T>(Func<ResponsePipelineResults, T> callback) => new(callback);


        public ResponsePipelineCallback(Func<ResponsePipelineResults, Task<T>> callback)
            : this(r => callback(r).Result)
        { }

        public ResponsePipelineCallback(Func<ResponsePipelineResults, T> callback)
        {
            Callback = callback;
        }
    }
}
