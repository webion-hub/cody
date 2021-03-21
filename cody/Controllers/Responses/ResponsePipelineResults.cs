using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Responses
{
    internal class ResponsePipelineResults : IList<object>
    {
        private List<object> _results;


        public T Get<T>(int index) where T: class
        {
            return this[index] as T;
        }


        public object this[int index] { get => ((IList<object>)_results)[index]; set => ((IList<object>)_results)[index] = value; }

        public int Count => ((ICollection<object>)_results).Count;

        public bool IsReadOnly => ((ICollection<object>)_results).IsReadOnly;

        public void Add(object item)
        {
            ((ICollection<object>)_results).Add(item);
        }

        public void Clear()
        {
            ((ICollection<object>)_results).Clear();
        }

        public bool Contains(object item)
        {
            return ((ICollection<object>)_results).Contains(item);
        }

        public void CopyTo(object[] array, int arrayIndex)
        {
            ((ICollection<object>)_results).CopyTo(array, arrayIndex);
        }

        public IEnumerator<object> GetEnumerator()
        {
            return ((IEnumerable<object>)_results).GetEnumerator();
        }

        public int IndexOf(object item)
        {
            return ((IList<object>)_results).IndexOf(item);
        }

        public void Insert(int index, object item)
        {
            ((IList<object>)_results).Insert(index, item);
        }

        public bool Remove(object item)
        {
            return ((ICollection<object>)_results).Remove(item);
        }

        public void RemoveAt(int index)
        {
            ((IList<object>)_results).RemoveAt(index);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return ((IEnumerable)_results).GetEnumerator();
        }
    }
}
