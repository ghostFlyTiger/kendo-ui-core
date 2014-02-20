namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;
using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent API for configuring the MapLayer settings.
    /// </summary>
    public class MapLayerBuilder: IHideObjectMembers
    {
        private readonly MapLayer container;

        public MapLayerBuilder(MapLayer settings)
        {
            container = settings;
        }

        /// <summary>
        /// Configures the data source of the map layer.
        /// </summary>
        /// <param name="configurator">The configuration of the data source.</param>
        /// <returns></returns>
        public MapLayerBuilder DataSource(Action<MapLayerDataSourceBuilder> configurator)
        {
            configurator(new MapLayerDataSourceBuilder(container.DataSource, container.ViewContext, container.UrlGenerator));

            return this;
        }

        /// <summary>
        /// Configures of the subdomains.
        /// </summary>
        /// <param name="subdomains">The subdomains</param>
        public MapLayerBuilder Subdomains(params string[] subdomains)
        {
            container.Subdomains = subdomains;

            return this;
        }

        //>> Fields
        
        /// <summary>
        /// The attribution for the layer. Accepts valid HTML.
        /// </summary>
        /// <param name="value">The value that configures the attribution.</param>
        public MapLayerBuilder Attribution(string value)
        {
            container.Attribution = value;

            return this;
        }
        
        /// <summary>
        /// If set to false the layer will not bind to the data source during initialization. In this case data binding will occur when the change event of the
		/// data source is fired. By default the widget will bind to the data source specified in the configuration.
        /// </summary>
        /// <param name="value">The value that configures the autobind.</param>
        public MapLayerBuilder AutoBind(bool value)
        {
            container.AutoBind = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the extent of the region covered by this layer.
		/// The layer will be hidden when the specified area is out of view.Accepts a four-element array that specifies the extent covered by this layer:
		/// North-West lat, longitude, South-East latitude, longitude.If not specified, the layer is always visible.
        /// </summary>
        /// <param name="value">The value that configures the extent.</param>
        public MapLayerBuilder Extent(params double[] value)
        {
            container.Extent = value;

            return this;
        }
        
        /// <summary>
        /// The API key for the layer. Currently supported only for Bing (tm) tile layers.
        /// </summary>
        /// <param name="value">The value that configures the key.</param>
        public MapLayerBuilder Key(string value)
        {
            container.Key = value;

            return this;
        }
        
        /// <summary>
        /// The data item field which contains the marker location.
		/// The field should be an array with two numbers - latitude and longitude.Requires the dataSource option to be set.
        /// </summary>
        /// <param name="value">The value that configures the locationfield.</param>
        public MapLayerBuilder LocationField(string value)
        {
            container.LocationField = value;

            return this;
        }
        
        /// <summary>
        /// The default marker shape for data-bound markers. The following pre-defined marker shapes are available:Marker shapes are implemented as CSS classes on the marker element (span.k-marker).
		/// For example "pinTarget" is rendered as "k-marker-pin-target".
        /// </summary>
        /// <param name="value">The value that configures the shape.</param>
        public MapLayerBuilder Shape(string value)
        {
            container.Shape = value;

            return this;
        }
        
        /// <summary>
        /// The data item field which contains the marker title.
		/// Requires the dataSource option to be set.
        /// </summary>
        /// <param name="value">The value that configures the titlefield.</param>
        public MapLayerBuilder TitleField(string value)
        {
            container.TitleField = value;

            return this;
        }
        
        /// <summary>
        /// The the opacity for the layer.
        /// </summary>
        /// <param name="value">The value that configures the opacity.</param>
        public MapLayerBuilder Opacity(string value)
        {
            container.Opacity = value;

            return this;
        }
        
        /// <summary>
        /// The default style for shapes.
        /// </summary>
        /// <param name="configurator">The action that configures the style.</param>
        public MapLayerBuilder Style(Action<MapLayerStyleSettingsBuilder> configurator)
        {
            configurator(new MapLayerStyleSettingsBuilder(container.Style));
            return this;
        }
        
        /// <summary>
        /// The URL template for tile layers. Template variables:
        /// </summary>
        /// <param name="value">The value that configures the urltemplateid.</param>
        public MapLayerBuilder UrlTemplateId(string value)
        {
            container.UrlTemplateId = value;

            return this;
        }
        
        /// <summary>
        /// The layer type. Supported types are "tile" and "shape".
        /// </summary>
        /// <param name="value">The value that configures the type.</param>
        public MapLayerBuilder Type(MapLayerType value)
        {
            container.Type = value;

            return this;
        }
        
        //<< Fields
    }
}

