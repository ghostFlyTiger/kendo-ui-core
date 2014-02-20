namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;
    using System.Web.Mvc;

    public class MapLayer : JsonObject
    {
        public MapLayer(ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            DataSource = new DataSource();
            ViewContext = viewContext;
            UrlGenerator = urlGenerator;
            //>> Initialization
        
            Style = new MapLayerStyleSettings();
                
        //<< Initialization
        }

        public ViewContext ViewContext
        {
            get;
            private set;
        }

        public IUrlGenerator UrlGenerator
        {
            get;
            private set;
        }

        public DataSource DataSource { get; set; }

        public string[] Subdomains { get; set; }

        //>> Fields
        
        public string Attribution { get; set; }
        
        public bool? AutoBind { get; set; }
        
        public double[] Extent { get; set; }
        
        public string Key { get; set; }
        
        public string LocationField { get; set; }
        
        public string Shape { get; set; }
        
        public string TitleField { get; set; }
        
        public string Opacity { get; set; }
        
        public MapLayerStyleSettings Style
        {
            get;
            set;
        }
        
        public string UrlTemplateId { get; set; }
        
        public MapLayerType? Type { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            var dataSource = DataSource.ToJson();

            if (dataSource.Any())
            {
                json["dataSource"] = dataSource;
            }

            if (Subdomains != null)
            {
                json["subdomains"] = Subdomains;
            }

            //>> Serialization
        
            if (Attribution.HasValue())
            {
                json["attribution"] = Attribution;
            }
            
            if (AutoBind.HasValue)
            {
                json["autoBind"] = AutoBind;
            }
                
            if (Extent != null)
            {
                json["extent"] = Extent;
            }
	    
            if (Key.HasValue())
            {
                json["key"] = Key;
            }
            
            if (LocationField.HasValue())
            {
                json["locationField"] = LocationField;
            }
            
            if (Shape.HasValue())
            {
                json["shape"] = Shape;
            }
            
            if (TitleField.HasValue())
            {
                json["titleField"] = TitleField;
            }
            
            if (Opacity.HasValue())
            {
                json["opacity"] = Opacity;
            }
            
            var style = Style.ToJson();
            if (style.Any())
            {
                json["style"] = style;
            }
                
            if (UrlTemplateId.HasValue())
            {
                json["urlTemplate"] = UrlTemplateId;
            }
            
            if (Type.HasValue)
            {
                json["type"] = Type;
            }
                
        //<< Serialization
        }
    }
}
