namespace Core.Specifications
{
    public class ProductSpecParams
    {
        public const int MaxPage = 50;

        public int PageIndex {get; set;} = 1; //By defualt we gonne return 1 page always

        private int _pageSize = 5;
        public int pageSize 
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPage ) ? MaxPage : value;
        }

        public int? BrandId {get; set;}

        public int? TypeId {get; set;}

        public string Sort {get; set;}
        private string _search;
        public string Search 
        { get => _search; 
        set => _search = value.ToLower(); 
        }
    }
}